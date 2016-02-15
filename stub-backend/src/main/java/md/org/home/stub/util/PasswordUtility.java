package md.org.home.stub.util;

import java.util.UUID;
import org.mindrot.jbcrypt.BCrypt;

/**
 * Created by BASS on 28.07.2015.
 */
public class PasswordUtility {

    public static String encode(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public static boolean check(String plain, String hashed) {
        return BCrypt.checkpw(plain, hashed);
    }

    public static String randomToken() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
