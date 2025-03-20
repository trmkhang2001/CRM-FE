import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getAllDepartment } from "@/services/departmentService";
import { DepartmentModel } from "@/models/employeeModel";

interface FilterDropdownsProps {
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}
export default function FilterDropdowns({ onDepartmentChange, onStatusChange }: FilterDropdownsProps) {
  const [departmentList, setDepartmentList] = useState<DepartmentModel[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await getAllDepartment();
      setDepartmentList(data);
    }
    fetchData();
  }, []);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    onDepartmentChange(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onStatusChange(value);
  };

  // Lấy tên phòng ban dựa vào id đã chọn
  const selectedDepartmentName =
    departmentList.find((dept) => dept.id.toString() === selectedDepartment)?.name || "Phòng ban";

  // Map status value sang tên tiếng Việt
  const statusLabels: Record<string, string> = {
    active: "Hoạt động",
    inactive: "Không hoạt động",
    resigned: "Từ chức",
  };
  const selectedStatusLabel = statusLabels[status] || "Trạng thái làm việc";

  return (
    <div className="flex gap-4">
      {/* Dropdown phòng ban */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {selectedDepartmentName} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={selectedDepartment}
            onValueChange={handleDepartmentChange}
          >
            {departmentList.map((dept) => (
              <DropdownMenuRadioItem key={dept.id} value={dept.id.toString()}>
                {dept.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dropdown trạng thái */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {selectedStatusLabel} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={status} onValueChange={handleStatusChange}>
            <DropdownMenuRadioItem value="active">Hoạt động</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="inactive">Không hoạt động</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="resigned">Từ chức</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
