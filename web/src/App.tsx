import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { GameController } from "phosphor-react";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { Input } from "./components/Form/input";

import "./styles/main.css";
import Logo from "./assets/Logo.svg";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={Logo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Your{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        is here.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="w-[480px] fixed bg-[#2A2634] py-8 px-10 text-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Create your Ad
            </Dialog.Title>

            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Choose a game
                </label>
                <Input
                  type="text"
                  name="game"
                  placeholder="Select the game you'd like to play"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">What is your nickname?</label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="How are you called in game?"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Years playing</label>
                  <Input
                    type="text"
                    name="yearsPlaying"
                    id="yearsPlaying"
                    placeholder="It's ok to be 0"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Discord</label>
                  <Input
                    type="text"
                    name="discord"
                    id="discord"
                    placeholder="User#0000"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">When do you usually play?</label>

                  <div className="grid grid-cols-4 gap-2">
                    <button title="Sunday" className="w-8 h-8 bg-zinc-900">
                      S
                    </button>
                    <button title="Monday" className="w-8 h-8 bg-zinc-900">
                      M
                    </button>
                    <button title="Tuesday" className="w-8 h-8 bg-zinc-900">
                      T
                    </button>
                    <button title="Wednesday" className="w-8 h-8 bg-zinc-900">
                      W
                    </button>
                    <button title="Thursday" className="w-8 h-8 bg-zinc-900">
                      T
                    </button>
                    <button title="Friday" className="w-8 h-8 bg-zinc-900">
                      F
                    </button>
                    <button title="Saturday" className="w-8 h-8 bg-zinc-900">
                      S
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">At which time do you play?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hourStart" type="time" placeholder="From" />
                    <Input id="hourEnd" type="time" placeholder="To" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />I usually use voice chat
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                  Cancel
                </Dialog.Close>

                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController size={24} />
                  Find Duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
