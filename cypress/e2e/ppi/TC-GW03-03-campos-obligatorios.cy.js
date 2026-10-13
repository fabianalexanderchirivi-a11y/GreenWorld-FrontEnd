describe('TC-GW03-03 — Campos obligatorios de inicio de sesión', () => {
  it('rechaza el formulario sin correo, sin contraseña y con ambos vacíos', () => {
    cy.intercept('POST', '/api/auth/login').as('login')
    cy.visit('/login', {
      onBeforeLoad(window) {
        window.localStorage.clear()
        window.sessionStorage.clear()
      },
    })

    const expectRequiredError = () => {
      cy.contains('button[type="submit"]', 'Iniciar sesión').click()
      cy.wait('@login').then(({ response }) => {
        expect(response.statusCode).to.eq(400)
        expect(response.body.success).to.eq(false)
      })
      cy.get('.login-error').should('contain.text', 'Correo y contrasena son obligatorios')
      cy.location('pathname').should('eq', '/login')
    }

    expectRequiredError()
    cy.get('#email').type('prueba@example.test')
    expectRequiredError()
    cy.get('#email').clear()
    cy.get('#password').type(`${Date.now()}-solo-password`, { log: false })
    expectRequiredError()

    cy.window().then((window) => {
      expect(window.sessionStorage.getItem('token')).to.be.null
      expect(window.localStorage.getItem('token')).to.be.null
    })
    cy.screenshot('TC-GW03-03-campos-obligatorios')
  })
})
