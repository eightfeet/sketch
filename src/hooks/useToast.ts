import Message from "@eightfeet/message";

const newMessage = new Message({});
newMessage.create("2222");
const useToast = () => newMessage;

export default useToast;
