export type CommandAction = () => void;

export interface CommandType {
  name: string;
  description?: string;
  label?: string;
  action: CommandAction;
}
