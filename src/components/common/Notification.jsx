import { Callout } from '@radix-ui/themes';

const Notification = ({ text, className, children }) => {
  return (
    <Callout.Root
      variant="soft"
      className={`${className} flex justify-between p-2`}
    >
      <Callout.Text className="self-center">{text}</Callout.Text>
      {children}
    </Callout.Root>
  );
};

export default Notification;
