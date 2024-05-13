export function formatDate(fechaHora: string): string {
  const fecha = new Date(fechaHora);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
  const año = fecha.getFullYear();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  // Convertir las horas al formato de 12 horas (AM/PM)
  const am_pm = horas >= 12 ? 'PM' : 'AM';
  const horas12 = horas % 12 || 12; // Si horas es 0, se convierte a 12 en formato de 12 horas

  // Aseguramos que los números tengan dos dígitos
  const diaStr = dia < 10 ? `0${dia}` : dia.toString();
  const mesStr = mes < 10 ? `0${mes}` : mes.toString();
  const añoStr = año.toString();
  const horasStr = horas12 < 10 ? `0${horas12}` : horas12.toString();
  const minutosStr = minutos < 10 ? `0${minutos}` : minutos.toString();

  return `${diaStr}/${mesStr}/${añoStr} - ${horasStr}:${minutosStr} ${am_pm}`;
}