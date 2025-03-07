interface Props {
    uri?: string | null | undefined; 
    typeId?: number | null | undefined;
  }
  
  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };
  
  const MultimediaPlayer = ({ uri, typeId }: Props) => {
    if (!uri) return null;
  
    return (
      <div className="w-full mt-6">
        {typeId === 1 ? (
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={getYoutubeEmbedUrl(uri)}
              title="Video de YouTube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            src={uri}
            alt="Contenido multimedia"
            className="w-full h-auto object-cover rounded-lg"
          />
        )}
      </div>
    );
  };
  
  export default MultimediaPlayer;
  