import { ResizeHandlePosition } from "./types";

export function getOppositeSide(side: ResizeHandlePosition): ResizeHandlePosition {
	switch (side) {
		case ResizeHandlePosition.RIGHT:
			return ResizeHandlePosition.LEFT;
		case ResizeHandlePosition.LEFT:
			return ResizeHandlePosition.RIGHT;
		case ResizeHandlePosition.TOP:
			return ResizeHandlePosition.BOTTOM;
		case ResizeHandlePosition.BOTTOM:
			return ResizeHandlePosition.TOP;
	}
}