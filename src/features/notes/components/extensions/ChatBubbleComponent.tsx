import React from 'react';
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react';

export const ChatBubbleComponent: React.FC<NodeViewProps> = (props) => {
  const { node, updateAttributes, selected } = props;

  // Extract attributes with defaults
  const type = node.attrs.type || 'sent';
  const sender = node.attrs.sender || '';

  const toggleType = () => {
    updateAttributes({
      type: type === 'sent' ? 'received' : 'sent',
    });
  };

  const updateSender = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({
      sender: e.target.value,
    });
  };

  return (
    <NodeViewWrapper
      className={`chat-bubble-wrapper my-4 group ${
        type === 'sent' ? 'flex justify-end' : 'flex justify-start'
      }`}
    >
      <div
        className={`chat-bubble relative max-w-[90%] sm:max-w-[80%] ${
          selected ? 'ring-2 ring-primary ring-offset-2' : ''
        } ${
          type === 'sent'
            ? 'bg-primary text-primary-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg'
            : 'bg-muted text-muted-foreground rounded-tl-lg rounded-tr-lg rounded-br-lg'
        }`}
        data-type={type}
      >
        {sender && (
          <div
            className={`chat-bubble-sender text-xs font-medium px-3 sm:px-4 pt-2 ${
              type === 'sent' ? 'text-primary-foreground/80' : 'text-muted-foreground/80'
            }`}
          >
            {sender}
          </div>
        )}
        <div className="chat-bubble-content p-3 sm:p-4 pt-2">
          <NodeViewContent className="chat-bubble-editor" />
        </div>
        <div className="chat-bubble-controls absolute -top-10 sm:-top-8 right-0 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity flex flex-col sm:flex-row gap-1 sm:gap-2 z-10 text-black dark:text-white">
          <button
            type="button"
            onClick={toggleType}
            className="p-1 bg-background border rounded text-xs whitespace-nowrap w-full sm:w-auto shadow-sm"
            title={`Switch to ${type === 'sent' ? 'received' : 'sent'} message`}
          >
            {type === 'sent' ? '← Received' : 'Sent →'}
          </button>
          <input
            type="text"
            value={sender}
            onChange={updateSender}
            placeholder="Sender name"
            className="p-1 bg-background border rounded text-xs w-full sm:w-24 shadow-sm"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
};
