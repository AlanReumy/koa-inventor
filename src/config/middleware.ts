export function middlewareConfig() {
  return {
    type: "checkbox",
    name: "middleware",
    choices: ["koa-static", "koa-router", "koa-bodyparser"],
  };
}

