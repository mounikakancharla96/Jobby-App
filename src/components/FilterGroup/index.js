import Profile from '../Profile'
import './index.css'

const FilterGroup = props => {
  const {employmentChanges, salaryChanges} = props
  const changeEmploymentType = event => {
    employmentChanges(event.target.value)
  }
  const renderEmployment = () => {
    const {employmentList} = props

    return (
      <div className="employment-container">
        <h1 className="employment-types-heading">Type of Employment</h1>
        <ul className="employment-list-container">
          {employmentList.map(eachEmployment => (
            <li
              key={eachEmployment.employmentTypeId}
              className="employee-item"
              onChange={changeEmploymentType}
            >
              <input
                type="checkbox"
                id={eachEmployment.employmentTypeId}
                className="checkbox-input"
                value={eachEmployment.employmentTypeId}
              />
              <label
                htmlFor={eachEmployment.employmentTypeId}
                className="employment-label"
              >
                {eachEmployment.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  const renderSalary = () => {
    const {salaryList} = props

    return (
      <div className="employment-container">
        <h1 className="employment-types-heading">Salary Range</h1>
        <ul className="employment-list-container">
          {salaryList.map(eachSalary => {
            const changeSalaryType = () => {
              salaryChanges(eachSalary.salaryRangeId)
            }
            return (
              <li
                key={eachSalary.salaryRangeId}
                className="employee-item"
                onChange={changeSalaryType}
              >
                <input
                  type="radio"
                  id={eachSalary.salaryRangeId}
                  className="checkbox-input"
                  name="salary"
                />
                <label
                  htmlFor={eachSalary.salaryRangeId}
                  className="employment-label"
                >
                  {eachSalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return (
    <>
      <Profile />
      <hr className="hr" />
      {renderEmployment()}
      <hr className="hr" />
      {renderSalary()}
    </>
  )
}

export default FilterGroup
