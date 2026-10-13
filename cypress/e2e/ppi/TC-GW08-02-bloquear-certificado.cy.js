import { availableCourse, loginByApi, visitWithSession } from '../../support/ppi'

describe('TC-GW08-02 — Bloquear certificado de curso incompleto', () => {
  let startedId
  let token

  afterEach(() => {
    if (startedId && token) {
      cy.request({
        method: 'PUT', url: `/api/cursos/${startedId}/cancelar`,
        headers: { Authorization: `Bearer ${token}` },
      }).its('status').should('eq', 200)
    }
  })

  it('rechaza la emisión y protege las rutas heredadas', () => {
    loginByApi().then((session) => {
      token = session.token
      availableCourse(session.token).then(({ id }) => {
        cy.request({
          method: 'POST',
          url: `/api/cursos/${id}/iniciar`,
          headers: { Authorization: `Bearer ${session.token}` },
        }).then(({ status }) => {
          expect(status).to.eq(200)
          startedId = id
        })

        visitWithSession(`/cursos/${id}`, session)
        cy.get('.course-state-pill').should('contain.text', 'En progreso')
        cy.contains('button', 'Descargar certificado').should('not.exist')

        cy.request({
          method: 'POST',
          url: `/api/cursos/${id}/certificado`,
          headers: { Authorization: `Bearer ${session.token}` },
          failOnStatusCode: false,
        }).then(({ status, body }) => {
          expect(status).to.eq(409)
          expect(body.success).to.eq(false)
        })

        cy.request({ method: 'GET', url: '/api/certificados', failOnStatusCode: false })
          .its('status').should('eq', 401)
        cy.request({
          method: 'POST', url: '/api/certificados', failOnStatusCode: false,
          body: { id_inscripcion: 1, codigo_certificado: 'INVALIDO', url_certificado: '/invalido' },
        }).its('status').should('eq', 401)
        cy.request({
          method: 'POST', url: '/api/certificados', failOnStatusCode: false,
          headers: { Authorization: `Bearer ${session.token}` },
          body: { id_inscripcion: 1, codigo_certificado: 'INVALIDO', url_certificado: '/invalido' },
        }).its('status').should('eq', 403)
        cy.request({ method: 'POST', url: '/api/inscripciones', failOnStatusCode: false, body: {} })
          .its('status').should('eq', 401)

        cy.screenshot('TC-GW08-02-bloquear-certificado')
      })
    })
  })
})
