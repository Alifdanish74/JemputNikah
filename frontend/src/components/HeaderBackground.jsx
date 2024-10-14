

// eslint-disable-next-line react/prop-types
function HeaderBackground({H1, P}) {
  return (
    <>
      {/* Header background */}
      <div className="flex flex-col gap-y-2 min-h-40 text-white items-center justify-center mx-auto header-background">
        {/* Your Kad Digital Page Content Here */}
        <h1 className="text-5xl">{H1}</h1>
        <p>{P}</p>
      </div>
    </>
  );
}

export default HeaderBackground;
