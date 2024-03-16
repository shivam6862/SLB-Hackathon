import { resData } from "@/app/page";

const ResponseItem = ({ data }: { data: resData }) => {
  return (
    <div className="response-item">
      <div className="response-item__header">
        <div className="response-item__header__title">{data.language}</div>
        <div className="response-item__header__date">{data.heading}</div>
      </div>
      <div className="response-item__content">{data.overview.description}</div>
    </div>
  );
};

export default ResponseItem;
