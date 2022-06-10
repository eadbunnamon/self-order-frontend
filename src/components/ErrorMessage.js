const ErrorMessage = ({error_message}) => {
  return (
    <div className="alert alert-danger" role="alert">
      {error_message}
    </div>
  )
};

export default ErrorMessage
