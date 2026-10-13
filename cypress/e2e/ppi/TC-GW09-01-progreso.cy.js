import { availableCourse, loginByApi, visitWithSession } from '../../support/ppi'

describe('TC-GW09-01 — Finalizar curso y registrar 100 %', () => {
  it('termina el curso en la interfaz y verifica el progreso persistido', () => {
    loginByApi().then((session) => {
      availableCourse(session.token).then(({ id, title }) => {
        cy.request({
          method: 'POST',
          url: `/api/cursos/${id}/iniciar`,
          headers: { Authorization: `Bearer ${session.token}` },
        }).then(({ status, body }) => {
          expect(status).to.eq(200)
          expect(body.data.estado_progreso).to.eq('en_progreso')
        })

        cy.intercept('GET', '/api/courses').as('courses')
        cy.intercept('GET', '/api/usuarios/me/cursos').as('myCourses')
        cy.intercept('PUT', `/api/cursos/${id}/progreso`).as('progress')

        visitWithSession(`/cursos/${id}`, session)
        cy.wait('@courses').its('response.statusCode').should('eq', 200)
        cy.wait('@myCourses').its('response.statusCode').should('eq', 200)
        cy.contains('h1', title).should('be.visible')
        cy.contains('button', 'Terminar curso').click()

        cy.wait('@progress').then(({ request, response }) => {
          expect(request.body.estado_progreso).to.eq('terminado')
          expect(request.body.porcentaje_avance).to.eq(100)
          expect(response.statusCode).to.eq(200)
          expect(response.body.data.estado_progreso).to.eq('terminado')
          expect(Number(response.body.data.porcentaje_avance)).to.eq(100)
        })

        cy.get('.course-state-pill').should('contain.text', 'Terminado')
        cy.get('.course-progress-panel').should('contain.text', '100%')
        cy.contains('Curso terminado').should('be.visible')

        cy.request({
          method: 'GET',
          url: '/api/usuarios/me/cursos',
          headers: { Authorization: `Bearer ${session.token}` },
        }).then(({ status, body }) => {
          expect(status).to.eq(200)
          const persisted = body.data.find((course) => String(course.id_curso) === String(id))
          expect(persisted).to.exist
          expect(persisted.estado_progreso).to.eq('terminado')
          expect(Number(persisted.porcentaje_avance)).to.eq(100)
        })

        cy.screenshot('TC-GW09-01-progreso')
      })
    })
  })
})
