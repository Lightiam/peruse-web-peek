import axios from 'axios';

export interface Submission {
  id: string;
  title: string;
  description?: string;
  content?: string;
  category?: string;
  status: 'pending' | 'approved' | 'rejected';
  fileName?: string;
  fileSize?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubmissionData {
  title: string;
  description?: string;
  content?: string;
  category?: string;
  file?: File;
}

export interface UpdateSubmissionData {
  title?: string;
  description?: string;
  content?: string;
  category?: string;
  status?: 'pending' | 'approved' | 'rejected';
  file?: File;
}

export interface SubmissionResponse {
  submissions: Submission[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class SubmissionService {
  private baseURL = '/api/submissions';

  async getSubmissions(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
  }): Promise<SubmissionResponse> {
    const response = await axios.get(this.baseURL, { params });
    return response.data;
  }

  async getSubmission(id: string): Promise<Submission> {
    const response = await axios.get(`${this.baseURL}/${id}`);
    return response.data.submission;
  }

  async createSubmission(data: CreateSubmissionData): Promise<Submission> {
    const formData = new FormData();
    
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.content) formData.append('content', data.content);
    if (data.category) formData.append('category', data.category);
    if (data.file) formData.append('file', data.file);

    const response = await axios.post(this.baseURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.submission;
  }

  async updateSubmission(id: string, data: UpdateSubmissionData): Promise<Submission> {
    const formData = new FormData();
    
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.content) formData.append('content', data.content);
    if (data.category) formData.append('category', data.category);
    if (data.status) formData.append('status', data.status);
    if (data.file) formData.append('file', data.file);

    const response = await axios.put(`${this.baseURL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.submission;
  }

  async deleteSubmission(id: string): Promise<void> {
    await axios.delete(`${this.baseURL}/${id}`);
  }

  async downloadFile(id: string): Promise<void> {
    const response = await axios.get(`${this.baseURL}/${id}/download`, {
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // Get filename from headers or use default
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'download';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }
    
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
}

export const submissionService = new SubmissionService();