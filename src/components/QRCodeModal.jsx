import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const QRCodeModal = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState('');
  const qrCodeRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setUrl(window.location.href);
    }
  }, [isOpen]);

  const handleDownload = () => {
    const canvas = qrCodeRef.current.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'warung-makan-bu-kus-qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast({
        title: 'Berhasil Diunduh!',
        description: 'Kode QR telah disimpan sebagai PNG.',
      });
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'URL Disalin!',
      description: 'Link menu telah disalin ke clipboard.',
    });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-stone-800">
            Pindai untuk Buka Menu
          </DialogTitle>
          <DialogDescription className="text-center text-stone-500">
            Arahkan kamera ponsel Anda ke kode QR ini untuk melihat menu digital.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4" ref={qrCodeRef}>
          <div className="p-4 bg-white rounded-lg border border-stone-200 shadow-md">
            <QRCodeCanvas
              value={url}
              size={256}
              bgColor={"#ffffff"}
              fgColor={"#44403c"} // stone-800
              level={"H"}
              includeMargin={true}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 p-2 bg-stone-100 rounded-md">
            <input
                id="link"
                defaultValue={url}
                readOnly
                className="flex-1 bg-transparent px-3 py-1 text-sm text-stone-600"
            />
            <Button type="button" size="sm" className="px-3" onClick={handleCopyUrl}>
                <span className="sr-only">Salin</span>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={handleDownload} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Unduh Kode QR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;