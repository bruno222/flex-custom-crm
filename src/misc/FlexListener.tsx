import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FlexEvent {
  flexEventType: string
}

interface SwitchTaskEvent extends FlexEvent  {
  taskAttributes?: {
    dealId?: number,
    contactId?: number,
  }
}

export default () => {
  const navigate = useNavigate();

  const screenPop = (data: SwitchTaskEvent) => {
    //if we have the contact ID pop it
    if (data.taskAttributes?.dealId) {
      //nav to contact
      console.log("crm: navigating to contact");
      navigate(`deals/${data.taskAttributes.dealId}/show`);
    } else if (data.taskAttributes?.contactId) {
      //nav to contact
      console.log("crm: navigating to contact");
      navigate(`contacts/${data.taskAttributes.contactId}/show`);
    } else {
      //new contact
      navigate(`/contacts/create`);
    }
  };

  useEffect(() => {
    window.addEventListener("message", function (event) {
      let data: FlexEvent | undefined;
      try {
        data = JSON.parse(event.data);
      } catch (error: any) {
        console.debug("Error when receiving message from child frame.", error);
      }
      if (data) {
        if (data.flexEventType) {
          console.log("Message received from Flex: ", data); // Message received from child

          switch (data.flexEventType) {
            case "SelectTask":
              screenPop(data);
          }
        }
      }
    });
  }, []);

  return <></>;
};
