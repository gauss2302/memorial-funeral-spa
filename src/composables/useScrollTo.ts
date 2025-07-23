export const useScrollTo = () => {
  const scrollToSection = (elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId)

    if (element) {
      const elementPosition = element.offsetTop - offset

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return {
    scrollToSection,
    scrollToTop,
  }
}
