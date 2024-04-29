const peer = new Peer();
        // Get HTML elements
        const localVideo = document.getElementById('localVideo');
        const remoteVideo = document.getElementById('remoteVideo');
        const callBtn = document.getElementById('callBtn');
        const peerIdInput = document.getElementById('peerIdInput');
        const peerIdDisplay = document.getElementById('peerIdDisplay');

        
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
               
                localVideo.srcObject = stream;

                peer.on('call', call => {
                   
                    call.answer(stream);

                   
                    call.on('stream', remoteStream => {
                        
                        remoteVideo.srcObject = remoteStream;
                    });
                });

             
                callBtn.addEventListener('click', () => {
                   
                    const peerId = peerIdInput.value;

                   
                    const call = peer.call(peerId, stream);

                    call.on('stream', remoteStream => {
                       
                        remoteVideo.srcObject = remoteStream;
                    });
                });
            })
       
        peer.on('open', id => {
            peerIdDisplay.textContent = `Your User ID is: ${id}`;
        });


