import * as mobx from 'mobx';

class UndoRedoHandler {

    constructor(value, state) {
        this.value = value;
        this.state = state;
        this.pushUndo(this.currentContext(), true);
        this.startTracking();
    }

    /**
     * Recover the existing value before the last change to to the underlying value.
     */
    popUndo = () => {
        if (this.undo.length < 2) {
            return;
        }
        this.pushRedo(this.undo.pop());
        this.restoreFrom(this.undo[this.undo.length - 1]);
        this.stopEditing();
    };

    /**
     * Recover the existing value before the last call to popUndo.
     */
    popRedo = () => {
        if (this.redo.length === 0) {
            return;
        }
        const context = this.redo.pop();
        this.pushUndo(context, false);
        this.restoreFrom(context);
    };

    getValueAsJson() {
        return JSON.stringify(this.value);
    }

    getStateAsJson() {
        return JSON.stringify(this.state);
    }

    currentContext() {
        return {
            state: this.getStateAsJson(),
            value: this.getValueAsJson()
        };
    }

    restoreFrom(context) {
        this.stopTracking();
        this.setValueFromJson(context.value);
        this.startTracking();
    }

    setValueFromJson(json) {
        Object.assign(this.value, JSON.parse(json));
    }

    pushUndo(context, redoReset) {
        if (this.editing) {
            if (this.holding) {
                this.undo[this.undo.length - 1] = context;
                return;
            }
            this.holding = true;
        }

        this.undo = this.undo || [];
        this.undo.push(context);
        if (redoReset) {
            this.redo = [];
        }
    }

    pushRedo(context) {
        this.redo.push(context);
    }

    startTracking() {
        this.removeTracker =
            mobx.reaction(
                () => this.getValueAsJson(),
                () => this.pushUndo(this.currentContext(), true));
    }

    stopTracking() {
        this.removeTracker();
    }

    startEditing() {
        this.editing = true;
        this.holding = false;
    }

    stopEditing() {
        this.editing = false;
        this.holding = false;
    }
}

export default UndoRedoHandler;