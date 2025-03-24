import ButtonClose from "@/components/ButtonClose/ButtonClose"
import { useStore } from '@nanostores/react';
import { deepseekResponse } from "../../stores/deepseekStore"

// const summary = "The text discusses the deployment of a humanoid robot named Neo in a home setting for the first time. The creators aim to develop truly intelligent robots by having them live among people and learn from daily interactions. Neo is tested for performing household tasks like making coffee and assisting in cooking. The creators emphasize the importance of learning from diverse data in home environments to advance towards intelligent androids capable of physical labor. They also address challenges related to AI safety, user privacy, and cybersecurity. The experience of having Neo in the home is described as surreal and a significant step towards the future of robotics."

// TODO: pasar summary por props
const ReadingPage = () => {
  const { summary } = useStore(deepseekResponse)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-2">
      <ButtonClose />
      <p className="text-3xl text-center">Summary</p>
      <div className="w-full max-w-2xl p-8">
        <div className="space-y-6">

          {summary.trim().split(/\n\s*\n/).map((paragraph, index) => (
            <p
              key={index}
              className="font-inter text-lg leading-relaxed text-gray-300 text-justify"
              style={{
                lineHeight: '2'
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReadingPage