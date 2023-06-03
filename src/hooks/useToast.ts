import Message from "@eightfeet/message";

const newMessage = new Message({
  style: {
    main: {
      backgroundColor: "red",
    },
  },
});

const newSuccessMessage = new Message({
  style: {
    main: {
      backgroundColor: "rgba(0, 68, 255, 0.9)",
    },
  },
});
const useToast = () => newMessage;

export const useSuccessToast = () => newSuccessMessage;

export default useToast;
