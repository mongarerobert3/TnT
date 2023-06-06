function formatDate(dateString) {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(date);
  return formattedDate;
}

export{formatDate};