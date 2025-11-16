import { Block } from '../../types';

interface BlockCardProps {
  block: Block;
}

export default function BlockCard({ block }: BlockCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
    </div>
  );
}
