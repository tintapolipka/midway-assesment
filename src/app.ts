import { AppError } from "./app.error";
import { list, details } from "./commands";
import { Store } from "./stores/store.type";
import { RecipeType } from "./recipe";
import { error } from "node:console";

type Command = (store: Store<RecipeType[]>, args: string[]) => Promise<void>;

export async function createApp(store: Store<RecipeType[]>, args: string[]) {
  const [, , command, ...restArgs] = args;

  const commands: Record<string, Command> = {
    list: list,
    details:details,
  };
  try {
    if (command in commands) {
      const commandFunction = commands[command];
      await commandFunction(store, restArgs);
    } else {
      throw new AppError(`Unknown command: ${command}`);
    }
  } catch (error) {
    // source: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
    let message: string;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    console.log(message);
  }
}
