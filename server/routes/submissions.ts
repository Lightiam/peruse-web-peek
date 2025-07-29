import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';
import prisma from '../config/database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'server', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images, PDFs, and text files
    const allowedTypes = /jpeg|jpg|png|gif|pdf|txt|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDFs, and document files are allowed'));
    }
  }
});

// Validation schemas
const createSubmissionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional()
});

const updateSubmissionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional()
});

// Get all submissions for the authenticated user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { page = '1', limit = '10', category, status } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {
      userId: req.user!.id
    };

    if (category) where.category = category;
    if (status) where.status = status;

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        skip,
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          status: true,
          fileName: true,
          fileSize: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.submission.count({ where })
    ]);

    res.json({
      submissions,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific submission
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const submission = await prisma.submission.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ submission });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new submission
router.post('/', authenticateToken, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    const data = createSubmissionSchema.parse(req.body);

    const submissionData: any = {
      ...data,
      userId: req.user!.id
    };

    // Add file information if uploaded
    if (req.file) {
      submissionData.filePath = req.file.path;
      submissionData.fileName = req.file.originalname;
      submissionData.fileSize = req.file.size;
    }

    const submission = await prisma.submission.create({
      data: submissionData,
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        category: true,
        status: true,
        fileName: true,
        fileSize: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(201).json({
      message: 'Submission created successfully',
      submission
    });
  } catch (error) {
    // Clean up uploaded file if validation fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Create submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a submission
router.put('/:id', authenticateToken, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    const data = updateSubmissionSchema.parse(req.body);

    // Check if submission exists and belongs to user
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });

    if (!existingSubmission) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Submission not found' });
    }

    const updateData: any = { ...data };

    // Handle file update
    if (req.file) {
      // Delete old file if it exists
      if (existingSubmission.filePath && fs.existsSync(existingSubmission.filePath)) {
        fs.unlinkSync(existingSubmission.filePath);
      }

      updateData.filePath = req.file.path;
      updateData.fileName = req.file.originalname;
      updateData.fileSize = req.file.size;
    }

    const submission = await prisma.submission.update({
      where: { id: req.params.id },
      data: updateData,
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        category: true,
        status: true,
        fileName: true,
        fileSize: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      message: 'Submission updated successfully',
      submission
    });
  } catch (error) {
    // Clean up uploaded file if update fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Update submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a submission
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const submission = await prisma.submission.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Delete associated file if it exists
    if (submission.filePath && fs.existsSync(submission.filePath)) {
      fs.unlinkSync(submission.filePath);
    }

    await prisma.submission.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Download file
router.get('/:id/download', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const submission = await prisma.submission.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id
      }
    });

    if (!submission || !submission.filePath) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!fs.existsSync(submission.filePath)) {
      return res.status(404).json({ error: 'File no longer exists' });
    }

    res.download(submission.filePath, submission.fileName || 'download');
  } catch (error) {
    console.error('Download file error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;