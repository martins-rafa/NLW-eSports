import * as Dialog from "@radix-ui/react-dialog";

import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient mt-8 self-stretch rounded-lg">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center rounded">
        <div>
          <strong className="text-2xl text-white font-black block">
            Didn't find your duo yet?
          </strong>
          <span className="text-zinc-400 block">
            Create your AD to find new players!
          </span>
        </div>

        <Dialog.Trigger className="flex items-center gap-3 py-3 px-4 font-medium text-white rounded bg-violet-500 hover:bg-violet-600">
          <MagnifyingGlassPlus size={24} />
          Create AD
        </Dialog.Trigger>
      </div>
    </div>
  );
}
