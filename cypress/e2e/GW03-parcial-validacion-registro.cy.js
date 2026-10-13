describe('GW-03 parcial — Validación del formulario de registro', () => {
  it('muestra el error de contraseñas distintas sin enviar la solicitud', () => {
    cy.intercept('POST', '/api/auth/register').as('registro')
    cy.visit('/register', {
      onBeforeLoad(window) {
        window.localStorage.clear()
        window.sessionStorage.clear()
      },
    })

    cy.get('#firstName').type('Prueba')
    cy.get('#lastName').type('Automatizada')
    cy.get('#registerEmail').type('prueba@example.invalid')
    cy.get('#registerPassword').type('ClaveSegura123')
    cy.get('#confirmPassword').type('OtraClave123')
    cy.get('#terms').check()
    cy.contains('button[type="submit"]', 'Crear cuenta').click()

    cy.get('.login-error').should('contain.text', 'Las contraseñas no coinciden')
    cy.get('@registro.all').should('have.length', 0)
    cy.screenshot('GW03-parcial-validacion-registro')
  })
})
