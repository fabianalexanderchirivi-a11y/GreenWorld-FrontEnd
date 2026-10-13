describe('GW-03 parcial — Acceso a una ruta protegida', () => {
  it('redirige al formulario de inicio de sesión cuando no hay sesión', () => {
    cy.visit('/mis-cursos', {
      onBeforeLoad(window) {
        window.localStorage.clear()
        window.sessionStorage.clear()
      },
    })

    cy.location('pathname').should('eq', '/login')
    cy.contains('h1', 'Bienvenido de nuevo').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.contains('button[type="submit"]', 'Iniciar sesión').should('be.visible')
    cy.screenshot('GW03-parcial-acceso-protegido')
  })
})
