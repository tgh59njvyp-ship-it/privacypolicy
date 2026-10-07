export interface TocItem {
  id: string;
  number: string;
  title: string;
  icon?: string;
}

export interface ChecklistItem {
  id: string;
  category: 'pinterest' | 'deployment' | 'legal';
  title: string;
  description: string;
  isChecked: boolean;
  isRequiredForReview: boolean;
}

export interface NextJsFile {
  path: string;
  content: string;
  description: string;
}
