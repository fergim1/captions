import { useFetch } from "../../../hooks/useFetch";
import { Loading } from "../../Loading/Loading";

export const GoogleTranslation = ({ word }) => {

  const language = "es"
  const url = `${import.meta.env.VITE_URL_SERVER}/api/google?word=${word}&language=${language}`;

  const { data, loading, error } = useFetch({ word, url });

  return (
    <div className="container-google-translation">
      {loading && <Loading />}
      {error && <Error error={error} />}
      <h2>{word}</h2>
      <p>{data}</p>
    </div>
  )

}