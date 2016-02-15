package md.org.home.stub.api;

import md.org.home.stub.util.PasswordUtility;
import org.springframework.stereotype.Component;

/**
 * Created by apple on 16.06.15.
 */

@Component
public class Main {

    public static void main(String[] args) {

/*

        String username = "test";
        String pass = "test";

        LinkedList<Integer> linkedList = new LinkedList<>();

        linkedList.add(0, 1);
        linkedList.add(1, 2);
        linkedList.add(2, 3);
        linkedList.add(3, 4);
        linkedList.add(4, 5);

        ListIterator<Integer> listIterator = linkedList.listIterator(2);

        System.out.println(listIterator.next());
        System.out.println(listIterator.next());

*/


        System.out.println(PasswordUtility.encode("admin"));
    }
}
