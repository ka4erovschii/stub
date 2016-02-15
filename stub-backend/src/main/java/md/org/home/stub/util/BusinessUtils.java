package md.org.home.stub.util;

import md.org.home.stub.exception.DataNotFoundException;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Random;

/**
 * Created by apple on 23.02.15.
 */
public class BusinessUtils {

    public static <T> T returnOrDataNotFound(T object) {
        if (object == null) {
            throw new DataNotFoundException("Requested object not found");
        }
        return object;
    }

    public static <T> List<T> returnOrDataNotFound(List<T> data) throws DataNotFoundException {
        if (CollectionUtils.isEmpty(data)) {
            throw new DataNotFoundException("No data found");
        }
        return data;
    }

    static Random rnd = new Random();

    public static String randomString( int len, String AB ){
        StringBuilder sb = new StringBuilder( len );
        for( int i = 0; i < len; i++ )
            sb.append( AB.charAt( rnd.nextInt(AB.length()) ) );
        return sb.toString();
    }

    public static boolean randomBoolean(){
        return new Random().nextBoolean();
    }
}
