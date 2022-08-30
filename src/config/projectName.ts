export function projectNameConfig() {
  return {
    type: "input",
    name: 'projectName',
    validate(projectName: string) {
      if (projectName)
        return true
      return 'please enter your project name!'
    }
  }
}