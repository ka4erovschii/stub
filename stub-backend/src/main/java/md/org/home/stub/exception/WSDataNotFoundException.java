package md.org.home.stub.exception;

public class WSDataNotFoundException extends RuntimeException {

    public WSDataNotFoundException() {
    }

    public WSDataNotFoundException(String message) {
        super(message);
    }

    public WSDataNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public WSDataNotFoundException(Throwable cause) {
        super(cause);
    }

    public WSDataNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
