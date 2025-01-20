// The 404 page
function NotFound() {
  return (
    <div className="not-found">
      <div className="text-center">
        <img
          className="w-1/2 max-w-md ml-auto mr-auto"
          src="/img/not-found-cat.png"
          alt="grumpy cat not found"
        />
      </div>
      <div className="text-center mt-20">
        <h1 className="text-8xl font-bold">404</h1>
        <div className="text-xl">Not found</div>
      </div>
    </div>
  );
}
export default NotFound;
