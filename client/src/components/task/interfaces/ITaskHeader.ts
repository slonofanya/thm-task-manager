export interface ITaskHeader {
  id: string;
  title?: string;
  date?: Date;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}
