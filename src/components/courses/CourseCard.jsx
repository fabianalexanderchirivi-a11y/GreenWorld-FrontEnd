import '../../styles/components/course-card.css'

export default function CourseCard({ course }) {
  return (
    <article className="courses-card">
      <div className="courses-card-face courses-card-front">
        <div className="courses-card-top">
          <span className="courses-card-category">{course.category}</span>
        </div>

        <div className="courses-card-main">
          <div className="courses-card-icon-shell">
            <img src={course.image} alt={course.name} className="courses-card-icon" />
          </div>

          <h3>{course.name}</h3>
        </div>
      </div>

      <div className="courses-card-face courses-card-back">
        <p>{course.description}</p>
        <span className="courses-card-level">{course.level}</span>
      </div>
    </article>
  )
}
