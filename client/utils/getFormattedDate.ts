import { format } from "date-fns";
import ruLocate from "date-fns/locale/ru";

export const getFormattedDate = (messageDate: string): string => {
  return format(new Date(messageDate), "dd.MM.yy");
};
