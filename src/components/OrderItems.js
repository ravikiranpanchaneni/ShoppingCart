import React from "react";

function OrderItems(props) {
  return props.orderItems.map((orderedItem) => {
    return orderedItem ? (
      <div className="itemContainer" key={orderedItem.isbn}>
        <div className="itemHeader">
          <div>
            {orderedItem.purchaseDate && (
              <span>
                {"Order Placed: "} {orderedItem.purchaseDate}
              </span>
            )}
          </div>
          <div>
            {orderedItem.bought && (
              <span>
                {"Status: "} {orderedItem.bought ? "Delivered" : "Ordered"}
              </span>
            )}
          </div>
        </div>
        <div className="itemDetails">
          <div>
            <div
              className={`itemImage ${
                orderedItem.thumbnailUrl ? "hasImage" : ""
              }`}
            >
              {orderedItem.thumbnailUrl && (
                <img
                  src={orderedItem.thumbnailUrl}
                  alt={orderedItem.thumbnailUrl}
                />
              )}
            </div>
            <div className="itemDetails">
              {orderedItem.title && (
                <div>
                  <h3>{orderedItem.title}</h3>
                </div>
              )}
              {orderedItem.authors && (
                <div className="detailsRow">
                  <b> By </b> <span>{getAuthorName(orderedItem.authors)}</span>
                </div>
              )}
              {orderedItem.price && (
                <div className="detailsRow">
                  <b> BookPrice</b>
                  <span>${orderedItem.price}</span>{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  });
}

function getAuthorName(authors) {
  let authorNames = "";
  for (let entry of authors) {
    authorNames = authorNames + entry + ", ";
  }
  return authorNames;
}
export default OrderItems;
