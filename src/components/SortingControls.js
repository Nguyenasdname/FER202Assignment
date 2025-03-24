import { Form } from "react-bootstrap"

function SortingControls({ onSort, sortOption }) {
  return (
    <div className="d-flex justify-content-end mb-3">
      <Form.Group className="d-flex align-items-center">
        <Form.Label className="me-2 mb-0">Sort by:</Form.Label>
        <Form.Select value={sortOption} onChange={(e) => onSort(e.target.value)} style={{ width: "auto" }}>
          <option value="default">Default</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="in-stock">In Stock First</option>
        </Form.Select>
      </Form.Group>
    </div>
  )
}

export default SortingControls;

