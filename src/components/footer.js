export const createFooter = () => {
    const footerContainer = document.createElement('footer');
    footerContainer.innerHTML = `
      <section class="footer">
        <p>
            <i class="fab fa-github-alt footer-icon"></i>
            Developed by
            <a class="devas" href="https://github.com/beatrizpenalva" target="blank" title="GITHUB PROFILE">Beatriz Penalva</a> 
            ,
            <a class="devas" href="https://github.com/beatrizpenalva" target="blank" title="GITHUB PROFILE">Gabrielle Almeida</a>
            & 
            <a class="devas" href="https://github.com/beatrizpenalva" target="blank" title="GITHUB PROFILE">Julia Terin</a>
            . 
        </p>
      </section>
    `;
    return footerContainer;
  };