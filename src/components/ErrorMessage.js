const ErrorMessage = ({error_message}) => {
  const errorMessages = error_message.split(", ");

  return (
    <div className="text-red-500">
      {errorMessages.map(msg => {
        return (
          <div>{msg}</div>
        )
      })}
    </div>
  )
};

export default ErrorMessage
