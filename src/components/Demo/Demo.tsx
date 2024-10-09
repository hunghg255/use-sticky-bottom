import { SVGProps, useState } from 'react';

import { useFakeMessages } from '@/components/Demo/useFakeMessages';
import { StickToBottom, useStickToBottomContext } from '@/hooks/StickToBottom';

export function IcBaselineArrowCircleDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8s-8-3.59-8-8s3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4l4-4z'
      ></path>
    </svg>
  );
}

function ScrollToBottom() {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  if (isAtBottom) {
    return <></>;
  }

  return (
    <button
      className='absolute i-ph-arrow-circle-down-fill text-4xl rounded-lg left-[50%] translate-x-[-50%] bottom-0 bg-black text-slate-100'
      onClick={() => scrollToBottom()}
    >
      <IcBaselineArrowCircleDown />
    </button>
  );
}

function Messages({ animation, speed }: { animation: any; speed: number }) {
  const messages = useFakeMessages(speed);

  return (
    <div className='prose flex flex-col gap-2 w-full'>
      <h2 className='flex justify-center'>{animation}:</h2>

      <StickToBottom
        className='relative h-[50vh] w-full'
        resize={animation}
        initial={animation === 'instant' ? 'instant' : { mass: 10 }}
      >
        <StickToBottom.Content className='flex flex-col gap-4 p-6'>
          {Array.from({ length: 10 }).map((_, i) => (
            <Message key={i}>
              <h1>This is a test</h1>
              more testing text...
            </Message>
          ))}

          {messages.map((message, i) => (
            <Message key={i}>{message}</Message>
          ))}
        </StickToBottom.Content>

        <ScrollToBottom />
      </StickToBottom>
    </div>
  );
}

export function Demo() {
  const [speed, setSpeed] = useState(0.2);

  return (
    <div className='flex flex-col gap-10 p-10'>
      <input
        className='w-full'
        type='range'
        value={speed}
        onChange={(e) => setSpeed(+e.target.value)}
        min={0}
        max={1}
        step={0.01}
      ></input>

      <div className='flex gap-6 w-[100vw]'>
        <Messages speed={speed} animation='smooth' />
        <Messages speed={speed} animation='instant' />
      </div>
    </div>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return <div className='bg-gray-100 rounded-lg p-4 shadow-md'>{children}</div>;
}
