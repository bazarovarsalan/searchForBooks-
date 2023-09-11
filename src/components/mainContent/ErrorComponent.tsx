interface Error {
  errorText: string;
}

const ErrorComponent = ({ errorText }: Error) => {
  return (
    <div
      className="alert alert-danger d-flex justify-content-center align-items-center"
      role="alert"
    >
      {errorText}
    </div>
  );
};

export default ErrorComponent;
