export function projectNameConfig() {
  return {
    type: "input",
    name: 'projectName',
    validate(projectName) {
      if (projectName)
        return true
      return 'please enter your project name!'
    }
  }
}