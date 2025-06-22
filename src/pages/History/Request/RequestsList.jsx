import { useState } from "react";
import { Request } from "./Request";
import { ResultModal } from "../ResultModal/ResultModal"; // создадим её

export function RequestList({ requests, onDelete }) {
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <div>
      <div>
        {requests.map((request) => (
          <div key={request.id} onClick={() => setSelectedRequest(request)}>
            <Request
              title={request.fileName}
              data={new Date(request.date).toLocaleDateString()}
              status={request.status}
              onDelete={() => onDelete(request.id)}
            />
          </div>
        ))}
      </div>

      {selectedRequest && (
        <ResultModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}
