export const handleSearchClick = (event) => {
  event.preventDefault();
  const searchSection = document.getElementById('search');
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const scrollToPosition = searchSection.offsetTop - navbarHeight;
  window.scrollTo({
    top: scrollToPosition,
    behavior: 'smooth',
  });
};
