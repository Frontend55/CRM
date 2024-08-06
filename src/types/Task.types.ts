export interface dataTask {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  creator?: string;
  status?: string;
}

export interface TaskTemplateProps {
  className?: string;
  isPopover?: boolean;
  data: dataTask;
  onDrop: Function;
}

export interface Drop {
  status: string;
}

export interface TaskProps {
  className?: string;
  isPopover?: boolean;
  data: dataTask;
  onDrop: Function;
}