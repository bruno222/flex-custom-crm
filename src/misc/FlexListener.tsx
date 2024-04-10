import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreate } from 'react-admin';
import { ContactNote } from '../types';
import { useDispatch } from 'react-redux';
import { incrementNotificationCount } from '../state/flexStateSlice';

interface FlexEvent {
  flexEventType: string;
}

interface SwitchTaskEvent extends FlexEvent {
  taskAttributes?: {
    dealId: number;
    contactId: number;
  };
}

interface CompleteTaskEvent extends FlexEvent {
  taskAttributes?: {
    dealId: number;
    contactId?: number;
    channelType?: string;
    caller?: string;
    direction?: string;
    conversations?: {
      outcome?: string;
    };
  };
}

interface AcceptTaskEvent extends FlexEvent {
  taskAttributes?: {
    dealId: number;
    contactId?: number;
  };
}

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [create, { isLoading, error }] = useCreate<ContactNote>();

  const getContactNoteContent = (data: CompleteTaskEvent): string => {
    if (data.taskAttributes?.conversations?.outcome) {
      return data.taskAttributes?.conversations?.outcome;
    }

    return 'No summary provided by agent';
  };

  const getContactNoteType = (data: CompleteTaskEvent): string => {
    const direction = data.taskAttributes?.direction;
    const firstPart = `${direction ? direction + ' ' : ''}`;

    if (data.taskAttributes?.channelType) {
      return `${firstPart}${data.taskAttributes?.channelType}`;
    } else if (data.taskAttributes?.caller) {
      return `${firstPart}call`;
    } else return 'contact';
  };

  const screenPop = (data: SwitchTaskEvent) => {
    //if we have the contact ID pop it
    if (data.taskAttributes?.dealId) {
      //nav to contact
      console.log('crm: navigating to contact');
      navigate(`deals/${data.taskAttributes.dealId}/show`);
    } else if (data.taskAttributes?.contactId) {
      //nav to contact
      console.log('crm: navigating to contact');
      navigate(`contacts/${data.taskAttributes.contactId}/show`);
    } else {
      //new contact
      navigate(`/contacts/create`);
    }
  };

  const updateRecordWithContact = (data: CompleteTaskEvent) => {
    try {
      const noteContent = getContactNoteContent(data);
      const noteType = getContactNoteType(data);

      //if we have the contact ID pop it
      if (data.taskAttributes?.dealId) {
        console.log('creating note: deal note', noteContent, noteType);
        create('dealNotes', {
          data: {
            text: getContactNoteContent(data),
            contact_id: data.taskAttributes?.dealId,
            sales_id: 0,
            type: getContactNoteType(data),
            date: new Date().toISOString(),
          },
        });
      } else if (data.taskAttributes?.contactId) {
        console.log('creating note: contact note', noteContent, noteType);
        create('contactNotes', {
          data: {
            text: noteContent,
            contact_id: data.taskAttributes?.contactId,
            sales_id: 0,
            type: noteType,
            date: new Date().toISOString(),
          },
        });
      } else {
        //new contact
        navigate(`/contacts/create`);
      }

      console.error('creating note: created');
    } catch (error: any) {
      console.error('creating note: error', error);
    }
  };

  const reservationCreatedHandler = (data: AcceptTaskEvent) => {
    dispatch(incrementNotificationCount());
  };

  useEffect(() => {
    window.addEventListener('message', function (event) {
      let data: FlexEvent | undefined;
      try {
        data = JSON.parse(event.data);
      } catch (error: any) {
        console.debug('Error when receiving message from child frame.', error);
      }
      if (data) {
        if (data.flexEventType) {
          console.log('Message received from Flex: ', data);

          switch (data.flexEventType) {
            case 'SelectTask':
              screenPop(data);
              break;
            case 'CompleteTask':
              updateRecordWithContact(data);
              break;
            case 'ReservationCreated':
              reservationCreatedHandler(data);
              break;
          }
        }
      }
    });
  }, []);

  return <></>;
};
